import React, { useState, useEffect } from 'react';
import { Input, Radio, Space, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import './index.scss';

const dateFormat = 'YYYY/MM/DD';

const { TextArea } = Input;

export default function DataDelivery() {

  const [frequency, setFrequency] = useState(1);

  const [method, setmethod] = useState(1);

  const [step, setStep] = useState('init');

  const [date, setDate] = useState("");

  const history = useHistory();

  const routerTo = (str: string) => {
    history.push(str)
  }

  const onChangeFrequency = (e: any) => {
    console.log('radio checked', e.target.value);
    setFrequency(e.target.value);
  };

  const onChangeMethod = (e: any) => {
    console.log('radio checked', e.target.value);
    setmethod(e.target.value);
  };

  const back = () => {
    if(step === 'init'){
      history.push('/home/job/dataProcessing')
    }else{
      setStep('init')
    }
  };

  return (
    <div className="dataDelivery">
      {
        step == 'init' &&
        <div className="con">
          <div className="title">Please select data delivery frequency</div>
          <Radio.Group value={frequency} onChange={onChangeFrequency}>
            <Space direction="vertical">
              <Radio value={1}>Executed by Smart Contract</Radio>
              <Radio value={2}>One time</Radio>
              <Radio value={3}>Daily</Radio>
              <Radio value={4}>Hourly</Radio>
            </Space>
          </Radio.Group>
          <div className="title top">Please select data delivery method</div>
          <Radio.Group value={method} onChange={onChangeMethod}>
            <Space direction="vertical">
              <Radio value={1}>Smart Contract</Radio>
              <Radio value={2}>text in json</Radio>
              <Radio value={3}>S3</Radio>
              <Radio value={4}>IPFS</Radio>
              <Radio value={5}>Arweave</Radio>
              <Radio value={6}>TiDB</Radio>
            </Space>
          </Radio.Group>
          <div className='date'>
            <div>
              {
                frequency === 3 &&
                <DatePicker format={dateFormat} value={date ? moment(date, dateFormat) : null} onChange={(date: any, dateString: string) => setDate(dateString)} />
              }

            </div>
            <div>
              {
                frequency === 4 &&
                <DatePicker format={dateFormat} value={date ? moment(date, dateFormat) : null} onChange={(date: any, dateString: string) => setDate(dateString)} />
              }
            </div>
          </div>
        </div>
      }
      {
        step == 'result_1' &&
        <div className="con">
          <div className='des1'>Your job has been submitted.The job will executed per requested by your Smart Contract</div>
          <div className='des1'>and result will be uploaded to smart contract for further use.</div>
          <div className='result_tit'>Below is how you can access the result from smart contract</div>
          <div>
            <TextArea rows={17} />
          </div>
        </div>
      }
      {
        step == 'result_2' &&
        <div className="con">
          <div className='des1'>Here is your result and it is being uploaded to smart contract. You will be notified when it is finished.</div>
          <div className='result_tit'>Below is how you can access the result from smart contract</div>
          <div className='result_2_area'>
            <div>
              <TextArea rows={17} />
            </div>
            <div>
              <TextArea rows={17} />
            </div>
          </div>
        </div>
      }
      {
        step == 'result_3' &&
        <div className="con">
          <div className='result_3_tit'>Here is your result</div>
          <div>
              <TextArea rows={20} />
            </div>
        </div>
      }
      {
        step == 'result_4' &&
        <div className="con">
          <div className='des1'>Here is your result and it is being uploaded to S3/IPFS/Arweave/TiDB. You will be notified when it is finished.</div>
          <div className='result_tit'>Below is how you can access the data</div>
          <div className='result_2_area'>
            <div>
              <TextArea rows={17} />
            </div>
            <div>
              <TextArea rows={17} />
            </div>
          </div>
        </div>
      }
      <div className='btn-group'>
        {
          step == 'init' &&
          <div className="chainlink-primary-btn" onClick={() => setStep('result_1')}>Next</div>
        }
        {
          step !== 'init' &&
          <div className="chainlink-primary-btn">Ok</div>
        }
        <div className="chainlink-default-btn" onClick={() => back()}>Back</div>
      </div>
    </div >
  );
}
