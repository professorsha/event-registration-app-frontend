import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { useParams } from 'react-router-dom';
export default function EventRegistrationPage(){
    const { eventId } = useParams(); // Получаем eventId из параметров маршрута
    // console.log(`${eventId}`);
    
    return(
        <RegisterForm eventId={`${eventId}`}/>
    );
}