import React, { useState, useEffect } from 'react';
import useWeb3Context from '../../../../hooks/useWeb3Context';
import useChainlinkContract from '../../../../contract/useChainlinkContract';
import './index.scss';
import Bac from "./../../../../static/img/bac4.png"
import { useHistory } from 'react-router-dom';

export default function JobInitialization() {
  const {account, connectWallet} = useWeb3Context();
  const chainlinkContract = useChainlinkContract()

  const history = useHistory();

  const routerTo = () => {
    history.push('/home/job/dataPreparation')
  }

  const requestPageRankInfo = async () => {
    const res = await chainlinkContract.requestPageRankInfo()
    console.log('111', res)

  }

  const requestPageRankInfoParams = async () => {
    // pass address here
    const res = await chainlinkContract.requestPageRankInfoParams(['0xdeE3aFB126db3f0C03F3163bC2F3b3f20587188D'])
  }

  return (
    <div className="jobInitialization">
      <div className='con'>
        <div>Click the button "Create a New Job" to initialize your job. It will generate a job instance and an access key to data access</div>
        <div>
          <img src={Bac} alt="" />
        </div>
        <div>
          {account ? (
            <>
              <div className="chainlink-primary-btn" onClick={() => routerTo()}>
                Create a New Job
              </div>
              <div>
                For test case:
                <div>
                  <a onClick={() => requestPageRankInfo()}>
                    Random request pagerank
                  </a><br/>
                  <a onClick={() => requestPageRankInfoParams()}>
                    Request pagerank with address
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div
              className="chainlink-primary-btn"
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
