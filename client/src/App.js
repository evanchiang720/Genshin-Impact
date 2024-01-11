import './App.css';
import { useState } from "react";
import Axios from 'axios';


function App() {
  const [remark, setRemark] = useState("");
  const [level, setLevel] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const [newRemark, setNewRemark] = useState([]);
  const [newLevel, setNewLevel] = useState(0);

  const [character, setCharacter] = useState("");

  const [cid, setCid] = useState("");

  const [rarity, setRarity] = useState(0);
  const [birthday, setBirthday] = useState("");

  const [mainRole, setMainRole] = useState("");

  const [useRate, setUseRate] = useState(0);

  const [link, setLink] = useState("");

  const convertRarityToStars = (rarity) => {
    const stars = Array.from({ length: 5 }, (_, index) => (index + 1 <= rarity ? '★' : '☆')).join(' ');
    return <span>{stars}</span>;
  };

  const mapMainRole = (mainRole) => {
    switch (mainRole) {
      case "Sub DPS":
        return "副C";
      case "Support":
        return "輔助";
      case "DPS":
        return "主C";
      default:
        return mainRole;
    }
  };  

  const addEmployee = () => {
      Axios.post('http://localhost:3001/create', {
      cid: cid,
      character: character,
      remark: remark,
      level: level,
      rarity: rarity,
      birthday: birthday,
      mainRole: mainRole,
      useRate: useRate,
      link: link
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          cid: cid,
          cha: character,
          remark: remark,
          level: level,
          rarity: rarity,
          birthday: birthday,
          mainRole: mainRole,
          useRate: useRate,
          link: link
        },
      ]);
      fetchCharacterInfo(cid); // Fetch additional info after adding an employee
    });
  };

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployee = (id) => {
    Axios.put('http://localhost:3001/update', {
      remark: newRemark,
      level: newLevel,
      id: id
    }).then((response) => {
      setEmployeeList(employeeList.map((val) => {
        if (((typeof newRemark) !== "string") || newRemark === ""){
          return val.id === id ? { id: val.id, cha: val.cha, remark: val.remark, level: newLevel, rarity: val.rarity, birthday: val.birthday, mainRole: val.mainRole, useRate: val.useRate, link: val.link} : val;
        } else if ((typeof newLevel) !== "string" || newLevel === ""){
          return val.id === id ? { id: val.id, cha: val.cha, remark: newRemark, level: val.level, rarity: val.rarity, birthday: val.birthday, mainRole: val.mainRole, useRate: val.useRate, link: val.link} : val;
        } else {
          return val.id === id ? { id: val.id, cha: val.cha, remark: newRemark, level: newLevel, rarity: val.rarity, birthday: val.birthday, mainRole: val.mainRole, useRate: val.useRate, link: val.link} : val;
        }
        
      }));
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
        return val.id !== id;
      }));
    });
  };

  const fetchCharacterId = (cha) => {
    Axios.get(`http://localhost:3001/getCharacterId/${cha}`).then((response) => {
      setCid(response.data.cid);
      setLink(response.data.link);
      fetchCharacterInfo(response.data.cid);
      fetchMainRole(response.data.cid);
      fetchUseRate(response.data.cid);
    });
  };

  const fetchCharacterInfo = (cid) => {
    Axios.get(`http://localhost:3001/getCharacterInfo/${cid}`).then((response) => {
      setRarity(response.data[0].rarity);
      setBirthday(response.data[0].birthday);
    });
  };

  const fetchMainRole = (cid) => {
    Axios.get(`http://localhost:3001/getMainRole/${cid}`).then((response) => {
      setMainRole(response.data[0].mainRole);
    });
  };

  const fetchUseRate = (cid) => {
    Axios.get(`http://localhost:3001/getUseRate/${cid}`).then((response) => {
      setUseRate(response.data[0][4.31]);
    });
    
  };

  return (
    <div className="App">
      <div className="info">
        <header>原神角色資料查詢</header>
        <label>角色:</label>
        <select
          value={character}
          onChange={(event) => {
            setCharacter(event.target.value);
            fetchCharacterId(event.target.value);
          }}
        >
          <option value=""></option>
          <option value="阿貝多">阿貝多</option>
          <option value="艾爾海森">艾爾海森</option>
          <option value="埃洛伊">埃洛伊</option>
          <option value="安柏">安柏</option>
          <option value="荒瀧一斗">荒瀧一斗</option>
          <option value="白朮">白朮</option>
          <option value="芭芭拉">芭芭拉</option>
          <option value="北斗">北斗</option>
          <option value="班尼特">班尼特</option>
          <option value="坎蒂絲">坎蒂絲</option>
          <option value="夏洛蒂">夏洛蒂</option>
          <option value="重雲">重雲</option>
          <option value="柯萊">柯萊</option>
          <option value="賽諾">賽諾</option>
          <option value="迪希雅">迪希雅</option>
          <option value="迪盧克">迪盧克</option>
          <option value="迪奧娜">迪奧娜</option>
          <option value="多莉">多莉</option>
          <option value="優菈">優菈</option>
          <option value="琺露珊">琺露珊</option>
          <option value="菲謝爾">菲謝爾</option>
          <option value="菲米尼">菲米尼</option>
          <option value="芙寧娜">芙寧娜</option>
          <option value="甘雨">甘雨</option>
          <option value="五郎">五郎</option>
          <option value="胡桃">胡桃</option>
          <option value="琴">琴</option>
          <option value="楓原萬葉">楓原萬葉</option>
          <option value="凱亞">凱亞</option>
          <option value="神里綾華">神里綾華</option>
          <option value="神里綾人">神里綾人</option>
          <option value="卡維">卡維</option>
          <option value="刻晴">刻晴</option>
          <option value="綺良良">綺良良</option>
          <option value="可莉">可莉</option>
          <option value="九條裟羅">九條裟羅</option>
          <option value="久岐忍">久岐忍</option>
          <option value="萊依拉">萊依拉</option>
          <option value="麗莎">麗莎</option>
          <option value="琳妮特">琳妮特</option>
          <option value="林尼">林尼</option>
          <option value="米卡">米卡</option>
          <option value="莫娜">莫娜</option>
          <option value="納西妲">納西妲</option>
          <option value="妮露">妮露</option>
          <option value="凝光">凝光</option>
          <option value="諾艾爾">諾艾爾</option>
          <option value="那維萊特">那維萊特</option>
          <option value="七七">七七</option>
          <option value="雷電將軍">雷電將軍</option>
          <option value="雷澤">雷澤</option>
          <option value="羅莎莉亞">羅莎莉亞</option>
          <option value="珊瑚宮心海">珊瑚宮心海</option>
          <option value="早柚">早柚</option>
          <option value="申鶴">申鶴</option>
          <option value="鹿野院平藏">鹿野院平藏</option>
          <option value="砂糖">砂糖</option>
          <option value="達達利亞">達達利亞</option>
          <option value="托馬">托馬</option>
          <option value="提納里">提納里</option>
          <option value="旅行者/風">旅行者/風</option>
          <option value="旅行者/岩">旅行者/岩</option>
          <option value="旅行者/雷">旅行者/雷</option>
          <option value="旅行者/草">旅行者/草</option>
          <option value="旅行者/水">旅行者/水</option>
          <option value="溫迪">溫迪</option>
          <option value="流浪者">流浪者</option>
          <option value="萊歐斯利">萊歐斯利</option>
          <option value="香菱">香菱</option>
          <option value="魈">魈</option>
          <option value="行秋">行秋</option>
          <option value="辛焱">辛焱</option>
          <option value="八重神子">八重神子</option>
          <option value="煙緋">煙緋</option>
          <option value="瑤瑤">瑤瑤</option>
          <option value="夜蘭">夜蘭</option>
          <option value="宵宮">宵宮</option>
          <option value="雲堇">雲堇</option>
          <option value="鍾離">鍾離</option>

        </select>
        <label>備註:</label>
        <input
          type="text"
          onChange={(event) => {
            setRemark(event.target.value);
          }}
        />
        <label>等級:</label>
        <input
          type="number"
          onChange={(event) => {
            setLevel(event.target.value);
          }}
        />

        <button onClick={addEmployee}>Add</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee" key={key}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <div>
                      <h3>角色: {val.cha}</h3>
                      <h3>備註: {val.remark}</h3>
                      <h3>星級: {convertRarityToStars(val.rarity)}</h3>
                      <h3>等級: {val.level}</h3>
                      <h3>定位: {mapMainRole(val.mainRole)}</h3>
                      <h3>生日: {val.birthday}</h3>
                      <h3>最近一次深淵使用率: {val.useRate}%</h3>
                  </div>
                <img src={val.link} alt = "error" style={{ marginLeft: '75px' }}/>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="修改備註..."
                  onChange={(event) => {
                    setNewRemark(event.target.value);
                  }}
                />
                <input
                  type="number"
                  placeholder="修改等級..."
                  onChange={(event) => {
                    setNewLevel(event.target.value);
                  }}
                />
                <button onClick={() => updateEmployee(val.id)}>Update</button>
                <button onClick={() => { deleteEmployee(val.id) }}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
