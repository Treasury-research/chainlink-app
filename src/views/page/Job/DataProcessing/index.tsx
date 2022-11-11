import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Select, Radio, Space, Input, Upload, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import './index.scss';
const { TextArea } = Input;

export default function DataProcessing() {

  const history = useHistory();

  const [process, setProcess] = useState(1);

  const [alogorithm, setAlogorithm] = useState(1);

  const [scriptType, setScriptType] = useState(1);
  
  const [step, setStep] = useState('init');

  const onChangeAlogorithm = (e: any) => {
    console.log('radio checked', e.target.value);
    setAlogorithm(e.target.value);
  };

  const onChangeProcess = (e: any) => {
    console.log('radio checked', e.target.value);
    setProcess(e.target.value);
  };

  const onChangeScriptType = (e: any) => {
    console.log('radio checked', e.target.value);
    setScriptType(e.target.value);
  };

  const processNext = () => {
    if(step == 'init'){
      setStep(`step_${process}`)
    }else{
      history.push('/home/job/dataDelivery')
    }
  }

  const routerTo = (str:string) => {
    history.push(str)
  }

  const getResult = () => {
    if(step == 'step_3'){
      if(alogorithm == 4){
        history.push('/home/job/dataDelivery')
      }else{
        setStep(`step_3_${alogorithm}`)
      }
    }
  }

  const back = () => {
    if(step == 'init'){
      history.push('/home/job/dataPreparation')
    }else{
      if(step.split('_').length == 2){
        setStep('init')
      }else{
        setStep(`step_${step.split('_')[1]}`)
      }
    }
  }
  return (
    <div className="dataProcessing">
      {
        step === 'init' &&
        <div className="con">
          <div className="title">Please select how you want the data to be processed</div>
          <div>
            <Radio.Group value={process} onChange={onChangeProcess}>
              <Space direction="vertical">
                <Radio value={1}>Raw Data</Radio>
                <Radio value={2}>Customized aggregation</Radio>
                <Radio value={3}>Algorithm Ready to Use</Radio>
                <Radio value={4}>Customized Algorithm</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
      }
      {
        (step === 'step_1' || step === 'step_3_1') &&
        <div className="con step_1">
          <div className="title">Please enter the address you are interested in, separate by ";"</div>
          <div className='des'>you can add <span>up to 10 address</span> at one time</div>
          <div className='des'>For a better user experience, there is a limit of 10 returned results for each query by default.</div>
          <div className='des'>You can modify this parameter to a maximum of 30 items for each query</div>
          <div>
            <TextArea rows={16} />
          </div>
        </div>
      }
      {
        step === 'step_2' &&
        <div className="con step_2">
          <div className="title">Please enter the SQL for data aggregation</div>
          <div>
            <TextArea rows={20} />
          </div>
        </div>
      }
      {
        step === 'step_3' &&
        <div className="con">
          <div className="title">Please select an alogorithm</div>
          <div>
            <Radio.Group value={alogorithm} onChange={onChangeAlogorithm}>
              <Space direction="vertical">
                <Radio value={1}>PageRank</Radio>
                <Radio value={2}>Address similarity</Radio>
                <Radio value={3}>Shortest Path between two addresses</Radio>
                <Radio value={4}>Community detection</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
      }
      {
        (step === 'step_3_2' || step === 'step_3_3') &&
        <div className="con step_3_2">
          <div className="title">Please enter the address you are interested in, separate by ";"</div>
          <div className='des1'>e.g.(00x00,01a02) ; (00x00,01a03)</div>
          <div className='des'>You can add <span>up to 10 pairs</span> at one time</div>
          <div>
            <TextArea rows={17} />
          </div>
        </div>
      }
      {
        step === 'step_4' &&
        <div className="con step_4">
          <div className="title">Please select your script type</div>
          <div className="radio">
            <Radio.Group value={scriptType} onChange={onChangeScriptType}>
              <Space direction="vertical">
                <Radio value={1}>Single Address based calculation</Radio>
                <Radio value={2}>Address pair based calculaion</Radio>
                <Radio value={3}>Model training and prediction</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="title">Please upload your algorithm script</div>
          <div>
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
        </div>
      }
      {
        step === 'step_3' &&
        <div className='btn-group'>
          <div className="chainlink-primary-btn" onClick={() => routerTo('/home/job/dataDelivery')}>Get Default Result</div>
          <div className="chainlink-prev-btn" onClick={() => getResult()}>Get Interested Result</div>
          <div className="chainlink-default-btn" onClick={() => back()}>Back</div>
        </div>
      }
      {
        step !== 'step_3' &&
        <div className='btn-group'>
          <div className="chainlink-primary-btn" onClick={() => processNext()}>Next</div>
          <div className="chainlink-default-btn" onClick={() => back()}>Back</div>
        </div>
      }
    </div>
  );
}
