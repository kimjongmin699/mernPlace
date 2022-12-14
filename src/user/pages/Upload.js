import React, { useState } from 'react'
import AWS from 'aws-sdk'
import { Row, Col, Button, Input, Alert } from 'reactstrap'
import './Upload.css'

const Upload = () => {
  const [progress, setProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  const REGION = 'ap-northeast-2'
  const S3_BUCKET = 'mern6858'

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  })

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  })

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    if (file.type !== 'image/jpeg' || fileExt !== 'jpg') {
      alert('jpg 파일만 Upload 가능합니다.')
      return
    }
    setProgress(0)
    setSelectedFile(e.target.files[0])
  }
  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: 'upload/' + file.name,
    }

    const response = myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100))
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
          setSelectedFile(null)
        }, 3000)
      })
      .send((err) => {
        if (err) console.log(err)
      })
    console.log(response)
  }

  return (
    <div>
      <div className="App-header">
        <Row>
          <Col>
            <h1>File Upload</h1>
          </Col>
        </Row>
      </div>
      <div className="App-body">
        <Row>
          <Col>
            {showAlert ? (
              <Alert color="primary">업로드 진행률 : {progress}%</Alert>
            ) : (
              <Alert color="primary">파일을 선택해 주세요.</Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Input color="primary" type="file" onChange={handleFileInput} />
            {selectedFile ? (
              <Button color="primary" onClick={() => uploadFile(selectedFile)}>
                {' '}
                Upload to S3
              </Button>
            ) : null}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Upload
