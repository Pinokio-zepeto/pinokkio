import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DescriptionCard from '../../components/pos/DescriptionCard';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const DateDisplay = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  font-weight: bold;
  text-align: center;
  &:hover {
    background-color: #e0e0e0;
  }
`;

function SalesReportPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    setStartDate(new Date());
    setEndDate(new Date());
  }, []);

  const handleTodayClick = () => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
  };

  const handleYesterdayClick = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setStartDate(yesterday);
    setEndDate(yesterday);
  };

  const handleThisWeekClick = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1);
    const lastDayOfWeek = new Date(today);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    setStartDate(firstDayOfWeek);
    setEndDate(lastDayOfWeek);
  };

  const handleThisMonthClick = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    setStartDate(firstDayOfMonth);
    setEndDate(lastDayOfMonth);
  };

  const formatDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime()) ? date.toLocaleDateString() : '';
  };
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
            <button onClick={handleYesterdayClick}>어제</button>
            <button onClick={handleTodayClick}>오늘</button>
            <button onClick={handleThisWeekClick}>이번주</button>
            <button onClick={handleThisMonthClick}>이번달</button>
          </div>
          <div>
            <DateDisplay onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} tabIndex="0">
              {formatDate(startDate)} ~ {formatDate(endDate)}
            </DateDisplay>
            {isDatePickerOpen && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  inline
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  inline
                />
              </div>
            )}
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
            <Bar data={data} options={options} />
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
