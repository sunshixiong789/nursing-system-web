import React, { useState } from "react";
import "./App.css";
import { Button, Card, Checkbox, Col, message, Row, Upload } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import Axios from "axios";

interface KeyModel {
  key: number;
  value: string;
}

const App: React.FC = () => {
  const [selectOne, setSelectOne] = useState<KeyModel[]>([]);
  const [selectTwo, setSelectTwo] = useState<KeyModel[]>([]);
  let oneList: any[] = [];
  let twoList: any[] = [];
  const beforeUpload = (file: any) => {
    /*const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error("仅支持 xls 格式的文件!");
    }
    return isPNG;*/
    return true;
  };
  const handleChangeOne = (file: UploadChangeParam) => {
    if (file.file.response) {
      setSelectOne(file.file.response);
    }
  };
  const handleChangeTwo = (file: UploadChangeParam) => {
    if (file.file.response) {
      setSelectTwo(file.file.response);
    }
  };
  const onChangeOne = (checkedValue: CheckboxValueType[]) => {
    oneList = checkedValue;
  };
  const onChangeTwo = (checkedValue: CheckboxValueType[]) => {
    twoList = checkedValue;
  };
  return (
    <div className="App" style={{ marginTop: 40 }}>
      <Row style={{ margin: 10 }}>
        <Col span={24}>
          <Button
            type={"primary"}
            onClick={() => {
              if (oneList.length === 0 || twoList.length === 0) {
                message.error("请选择要比对的行");
                return;
              }
              if (oneList.length !== twoList.length) {
                message.error("比较的行数不同");
                return;
              }
              Axios.post("/file/downLoad", { oneList, twoList }).then(value => {
                window.open("http://localhost:8080/file/getExcel", "_blank");
              });
            }}
          >
            导出生成表格
          </Button>
        </Col>
      </Row>
      <Row justify={"space-around"}>
        <Col span={11}>
          <Card hoverable={true}>
            <Upload
              action={"/file"}
              beforeUpload={beforeUpload}
              onChange={handleChangeOne}
              data={{ name: "table1" }}
            >
              <Button icon={<UploadOutlined />}>上传主表</Button>
            </Upload>
            <Checkbox.Group style={{ width: "100%" }} onChange={onChangeOne}>
              <Row justify={"start"}>
                {selectOne.map(value => {
                  return (
                    <Col key={value.key} span={6}>
                      <div style={{ display: "flex" }}>
                        <Checkbox value={value.key}>{value.value}</Checkbox>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={11}>
          <Card hoverable={true}>
            <Upload
              action={"/file"}
              beforeUpload={beforeUpload}
              onChange={handleChangeTwo}
              data={{ name: "table2" }}
            >
              <Button icon={<UploadOutlined />}>上传次表</Button>
            </Upload>
            <Checkbox.Group style={{ width: "100%" }} onChange={onChangeTwo}>
              <Row justify={"start"}>
                {selectTwo.map(value => {
                  return (
                    <Col key={value.key} span={6}>
                      <div style={{ display: "flex" }}>
                        <Checkbox value={value.key}>{value.value}</Checkbox>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </Card>
        </Col>
      </Row>
      <div
        style={{
          clear: "both",
          display: "block",
          position: "absolute",
          width:"100%",
          bottom: "20px",
          textAlign:"center"
        }}
      >
        乐山中支科技科
      </div>
    </div>
  );
};

export default App;
