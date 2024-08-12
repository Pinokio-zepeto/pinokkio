import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DescriptionCard from '../../components/pos/DescriptionCard';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import Navbar from '../../components/pos/Navbar';

Chart.register(...registerables);

const MainOuter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  min-height: 100vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const Buttons = styled.div`
  display: flex;
`;

const DateNavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* gap: 10px; */
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.startDate.getDate() === props.configStartDate &&
    props.endDate.getDate() === props.configEndDate
      ? '#d9d9d9'
      : 'rgb(255, 255, 255, 0)'};
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
`;

const DateDisplay = styled.div`
  border: 1px solid #ddd;
  cursor: pointer;
  width: 300px;
  padding: 10px;
  text-align: center;
  user-select: none;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const DatePickerWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  .react-datepicker {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__header {
    background-color: white;
    border-bottom: none;
  }

  .react-datepicker__day--selected {
    background-color: #007bff;
    color: white;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #007bff;
    color: white;
  }

  .react-datepicker__day-name,
  .react-datepicker__day {
    color: #333;
  }

  .react-datepicker__day-name:nth-child(1),
  .react-datepicker__day:nth-child(1) {
    color: red;
  }

  .react-datepicker__day-name:nth-child(7),
  .react-datepicker__day:nth-child(7) {
    color: #007bff;
  }

  .react-datepicker__day:hover {
    background-color: #f0f8ff;
  }
`;

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Descriptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  border: solid 1px black;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Charts = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

function SalesReportPage() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // useEffect(() => {
  //   setStartDate(new Date());
  //   setEndDate(new Date());
  // }, []);

  useEffect(() => {}, [startDate]);
  useEffect(() => {}, [endDate]);

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

  const handleTest = () => {
    console.log('start - date');
    console.log(startDate.getDate());
    console.log('end - date');
    console.log(endDate.getDate());
    console.log('boolean');
    console.log(startDate === endDate);
    console.log(new Date().getDate() - 1);
  };

  const data = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
    datasets: [
      {
        label: '매출',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
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
      <Navbar isOpen={isNavbarOpen} toggleNavbar={() => setIsNavbarOpen(!isNavbarOpen)} />
      <Main>
        <Header onClick={handleTest}>매출 리포트</Header>
        <DateNavBar>
          <Buttons>
            <Button
              onClick={handleYesterdayClick}
              startDate={startDate}
              endDate={endDate}
              configStartDate={new Date().getDate() - 1}
              configEndDate={new Date().getDate() - 1}
            >
              어제
            </Button>
            <Button
              onClick={handleTodayClick}
              startDate={startDate}
              endDate={endDate}
              configStartDate={new Date().getDate()}
              configEndDate={new Date().getDate()}
            >
              오늘
            </Button>
            <Button
              onClick={handleThisWeekClick}
              startDate={startDate}
              endDate={endDate}
              configStartDate={new Date().getDate() - new Date().getDay() + 1}
              configEndDate={new Date().getDate() - new Date().getDay() + 7}
            >
              이번주
            </Button>
            <Button
              onClick={handleThisMonthClick}
              startDate={startDate}
              endDate={endDate}
              configStartDate={new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1
              ).getDate()}
              configEndDate={new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0
              ).getDate()}
            >
              이번달
            </Button>
          </Buttons>
          <DateDisplay onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} tabIndex="0">
            날짜 {formatDate(startDate)} ~ {formatDate(endDate)}
          </DateDisplay>
        </DateNavBar>
        <MainBody>
          {isDatePickerOpen && (
            <DatePickerWrapper>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                inline
                locale={ko}
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                inline
                locale={ko}
              />
            </DatePickerWrapper>
          )}
          <Descriptions>
            <DescriptionCard
              title={'실매출'}
              contents={'135,000원'}
              notice={'지난 주 수요일보다 +15,000원 늘었어요.'}
            />
            <DescriptionCard
              title={'주문건'}
              contents={'5건'}
              notice={'지난 주 수요일보다 1건 늘었어요.'}
            />
            <DescriptionCard title={'할인'} contents={'0원'} notice={''} />
          </Descriptions>
          <Charts>
            <Bar data={data} options={options} />
          </Charts>
        </MainBody>
      </Main>
    </MainOuter>
  );
}

export default SalesReportPage;
