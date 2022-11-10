import React, { useState, useEffect } from 'react';
import './index.scss';
import Bac from "./../../../../static/img/bac4.png"
import { useHistory } from 'react-router-dom';

export default function JobInitialization() {

  const history = useHistory();

  const routerTo = () => {
    history.push('/home/job/dataPreparation')
  }

  return (
    <div className="jobInitialization">
      <div className='con'>
        <div>Click the button "Create a New Job" to initialize your job. It will generate a job instance and an access key to data access</div>
        <div>
          <img src={Bac} alt="" />
        </div>
        <div>
          <div className="chainlink-primary-btn" onClick={() => routerTo()}>Create a New Job</div>
        </div>
      </div>
    </div>
  );
}
