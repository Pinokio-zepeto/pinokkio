import React, { useState } from 'react';
import styled from 'styled-components';

const CategoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ModalBackground = styled.div``;
const ModalContent = styled.div``;
const ModalButton = styled.button``;

const CategoryRow = styled.tr`
  border-bottom: 1px solid #ddd;
  &:hover .delete-button {
    opacity: 1;
  }
`;

const CategoryCell = styled.td`
  padding: 10px;
  vertical-align: middle;
`;

const DeleteCell = styled(CategoryCell)`
  width: 30px;
`;

const DeleteButton = styled.button`
  opacity: 0;
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  transition: opacity 0.3s ease;
`;

const CategoryList = ({ categories, onEdit, onDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    onDelete(categoryToDelete.id);
    setShowConfirmModal(false);
  };

  return (
    <>
      <CategoryTable>
        <thead>
          <CategoryRow>
            <th></th>
            <th>카테고리명</th>
          </CategoryRow>
        </thead>
        <tbody>
          {categories.map((category) => (
            <CategoryRow key={category.id}>
              <DeleteCell>
                <DeleteButton className="delete-button" onClick={() => handleDeleteClick(category)}>
                  X
                </DeleteButton>
              </DeleteCell>
              <CategoryCell onClick={() => onEdit(category)}>{category.name}</CategoryCell>
            </CategoryRow>
          ))}
        </tbody>
      </CategoryTable>
      {showConfirmModal && (
        <ModalBackground>
          <ModalContent>
            <p>{categoryToDelete.name} 카테고리를 삭제하시겠습니까?</p>
            <ModalButton onClick={confirmDelete}>확인</ModalButton>
            <ModalButton onClick={() => setShowConfirmModal(false)}>취소</ModalButton>
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
};

export default CategoryList;
