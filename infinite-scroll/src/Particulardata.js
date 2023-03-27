import {useLocation} from 'react-router-dom';

export default function ParticularData(props){

    const location = useLocation()

    return (
        <>
        <div className='size flex'>
            <div className="card">
                <h4>{location.state.title}</h4>
                <h5>{location.state.author}</h5>
                <p>{location.state.url}</p>
            </div>
        </div>
        </>
    )
}


