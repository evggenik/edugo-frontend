import { useState, useEffect } from "react";
import { getToken, getDecodedToken } from "../../utils/auth";
import Header from "../../components/Header/Header";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";

registerLocale("ru", ru);

import "./SchedulePage.css";

function SchedulePage() {
    const [lessons, setLessons] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        async function fetchLessons() {
            const token = getToken();
            const decoded = getDecodedToken();

            const from = new Date(selectedDate);
            from.setHours(0, 0, 0, 0);
            const to = new Date(selectedDate);
            to.setHours(23, 59, 59, 999);

            const params = new URLSearchParams({
                teacherId: decoded.userId,
                from: from.toISOString(),
                to: to.toISOString()
            });

            const response = await fetch(
                `http://localhost:8080/api/v1/lessons?${params}`,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            const data = await response.json();
            setLessons(data);
        }

        fetchLessons();
    }, [selectedDate]);

    function goToPrevious() {
        const prev = new Date(selectedDate);
        prev.setDate(selectedDate.getDate() - 1);
        setSelectedDate(prev);
    }

    function goToNext() {
        const next = new Date(selectedDate);
        next.setDate(selectedDate.getDate() + 1);
        setSelectedDate(next);
    }

    function goToToday() {
        setSelectedDate(new Date());
    }

    return (
        <>
            <Header />
        <div className="schedule-page">
            <div className="schedule-header">
                <div className="schedule-header-left">
                    <span className="schedule-title">Мое расписание на день</span>
                </div>
                <div className="schedule-header-right">
                    <button className="link-button" onClick={goToToday}>Сегодня</button>
                    <button className="arrow-button" onClick={goToPrevious}>‹</button>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="d MMM, EEE"
                        locale="ru"
                        className="date-picker-input"
                    />
                    <button className="arrow-button" onClick={goToNext}>›</button>
                </div>
            </div>

            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Время</th>
                        <th>Урок</th>
                        <th>Тема урока</th>
                        <th>Домашнее задание</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map((lesson, index) => (
                        <tr key={lesson.id}>
                            <td>{index + 1}</td>
                            <td>
                                {lesson.startTime.slice(11, 16)} - {lesson.endTime.slice(11, 16)}
                            </td>
                            <td>
                                <div className="lesson-subject">{lesson.subjectName}</div>
                                <div className="lesson-room">кабинет {lesson.room}</div>
                            </td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default SchedulePage;