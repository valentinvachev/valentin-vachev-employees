import { useEffect } from 'react';
import printConsole from '../../utils/printConsole';
import './DataVisualizer.css';

const DataVisualizer = ({ data, goBack }) => {
    useEffect(() => {
        printConsole(data);
    }, [data]);

    return (
        <div className='data-visualizer-wrapper'>
            <div className='data-visualizer-back-wrapper'>
                <button onClick={goBack}>Go back</button>
            </div>
            <table className='data-visualizer'>
                <tbody>
                    <tr>
                        <th>Employee ID #1</th>
                        <th>Employee ID #2</th>
                        <th>Project ID</th>
                        <th>Days Worked</th>
                    </tr>
                    {Object.keys(data.projects).map((proj, index) => (
                        <tr key={`${proj}${index}`}>
                            <td>{data.firstEmployeeId}</td>
                            <td>{data.secondEmployeeId}</td>
                            <td>{proj}</td>
                            <td>{data.projects[proj]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataVisualizer;
