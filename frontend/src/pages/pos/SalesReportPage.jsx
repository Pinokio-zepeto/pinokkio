import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DescriptionCard from '../../components/pos/DescriptionCard';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const MainOuter = styled.div`
  display: flex;
  flex-direction: row;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainHeader = styled.div`
  display: flex;
  flex-direction: row;
`;
const MainBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const Descriptions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: solid 1px black;
`;

const Charts = styled.div`
  border: 1px;
`;

function SalesReportPage() {
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    // todayDate를 세팅한다.
  });

  const data = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
      },
    },
  };

  return (
    <MainOuter>
      <Main>
        <div>매출 리포트</div>
        <MainHeader>
          <div>
            <button>어제</button>
            <button>오늘</button>
            <button>이번주</button>
            <button>이번달</button>
          </div>
          <div>
            <div>2024-06-10 ~ 2024-07-10</div>
          </div>
        </MainHeader>
        <MainBody>
          <Descriptions>
            <DescriptionCard
              title={'실매출'}
              contents={'135000'}
              notice={'지난 주 수요일보다 +15,000원  늘었어요.'}
            ></DescriptionCard>
            <DescriptionCard
              title={'주문건'}
              contents={'5건'}
              notice={'지난 주 수요일보다 1건 늘었어요.'}
            ></DescriptionCard>
            <DescriptionCard title={'할인'} contents={'0원'} notice={''}></DescriptionCard>
          </Descriptions>
          <Charts>
            <Bar data={data} options={options} />;
          </Charts>
        </MainBody>
      </Main>
      <div>
        <button>^</button>
        <button>v</button>
      </div>
    </MainOuter>
  );
}

export default SalesReportPage;
