import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { useHistory } from 'react-router-dom';
import './index.scss';

export default function DataPreparation() {

  const history = useHistory();

  const routerTo = (str: string) => {
    history.push(str)
  }

  return (
    <div className="dataPreparation">
      <div className="con">
        <div className="title">Please select the data you will be using</div>
        <div className="title-small">User base info</div>
        <div className="input">
          <Select
            options={[
              {
                value: 'address',
                label: 'address',
              }
            ]}
          />
        </div>
        <div className="title-small">Social status</div>
        <div className="input">
          <Select
            mode="multiple"
            options={[
              {
                value: '1',
                label: 'POAPs Attend',
              },
              {
                value: '2',
                label: 'RSS Follows',
              },
              {
                value: '3',
                label: 'Snapshot Vote',
              },
              {
                value: '4',
                label: 'Twitter',
              },
              {
                value: '5',
                label: 'Lens Profile',
              },
              {
                value: '6',
                label: 'Lens Follower',
              }
            ]}
          />
        </div>
        <div className="title-small">Financial status</div>
        <div className="input">
          <Select
            options={[
              {
                value: '1',
                label: 'Token holding',
              },
              {
                value: '2',
                label: 'NFT holding',
              }
            ]}
          />
        </div>
        <div className="title-small">On Chain reputation</div>
        <div className="input">
          <Select
            options={[]}
          />
        </div>
      </div>
      <div className='btn-group'>
        <div className="chainlink-primary-btn" onClick={() => routerTo('/home/job/dataProcessing')}>Next</div>
        <div className="chainlink-default-btn" onClick={() => routerTo('/home/job/jobInitialization')}>Back</div>
      </div>
    </div>
  );
}
