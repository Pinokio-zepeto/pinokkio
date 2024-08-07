package com.example.pinokkio.api.room;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class WebSocketService {

    private final ConcurrentHashMap<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    public void addSession(WebSocketSession session) {
        sessions.put(session.getId(), session);
    }

    public void removeSession(WebSocketSession session) {
        if (session != null && sessions.containsKey(session.getId())) {
            sessions.remove(session.getId());
            try {
                if (session.isOpen()) {
                    session.close();
                }
            } catch (IOException e) {
                log.error("Error closing WebSocket session: " + session.getId(), e);
            }
        }
    }

    public void handleMessage(WebSocketSession session, TextMessage message) {
        try {
            JSONObject jsonMessage = new JSONObject(message.getPayload());
            String type = jsonMessage.getString("type");

            if (type.equals("participantInfo")) {
                handleParticipantInfo(session, jsonMessage);
            } else {
                log.warn("Unknown message type: {}", type);
            }
        } catch (JSONException e) {
            log.error("[handleMessage] Error: {}", e.getMessage());
        }
    }

    private void handleParticipantInfo(WebSocketSession session, JSONObject jsonMessage) throws JSONException {
        String participantName = jsonMessage.getString("participantName");
        sessions.put(participantName, session);
    }

    public boolean isTokenIssued(String userId) {
        WebSocketSession session = sessions.get(userId);
        return session != null && Boolean.TRUE.equals(session.getAttributes().get("tokenIssued"));
    }

    public void sendMessage(String recipientId, TextMessage message) {
        WebSocketSession session = sessions.get(recipientId);
        if (session != null && session.isOpen()) {
            try {
                session.sendMessage(message);
            } catch (IOException e) {
                log.error("Error sending message to session: " + recipientId, e);
            }
        } else {
            log.warn("Session not found or closed for recipient: " + recipientId);
        }
    }

    public void sendRoomId(String userId, String roomId) {
        WebSocketSession session = sessions.get(userId);

        if (session != null && session.isOpen()) {
            try {
                JSONObject jsonMessage = new JSONObject();
                jsonMessage.put("type", "roomId");
                jsonMessage.put("roomId", roomId);
                session.sendMessage(new TextMessage(jsonMessage.toString()));
                session.getAttributes().put("tokenIssued", true);
                log.info("RoomId sent successfully to participant: {}", userId);
            } catch (IOException | JSONException e) {
                log.error("[sendRoomId] Error: {}", e.getMessage());
                throw new RuntimeException("Failed to send roomId", e);
            }
        } else {
            throw new RuntimeException("Session not found or closed for participant: " + userId);
        }
    }
}