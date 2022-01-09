import Uploader from './components/Uploader';
import DataVisualizer from './components/DataVisualizer';
import { useState } from 'react';
import './App.css';

function App() {
    const [pairEmployees, setPairEmployees] = useState({});

    return (
        <div className='application'>
            <h1>
                Pair of employees that have worked as a team for the longest
                time
            </h1>
            {pairEmployees && Object.keys(pairEmployees).length ? (
                <>
                    <DataVisualizer
                        data={pairEmployees}
                        goBack={() => setPairEmployees({})}
                    />
                </>
            ) : (
                <Uploader setData={setPairEmployees} />
            )}
        </div>
    );
}

export default App;
