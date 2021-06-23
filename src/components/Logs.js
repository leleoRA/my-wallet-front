import styled from 'styled-components';
import dayjs from "dayjs";

export default function Logs({ entries }) {
  const balance = entries.reduce((acc,entry)=>{
    const val = entry.logKind === "earning" ? entry.value : -entry.value;
    return acc += val;
  },0);

  const balanceText = (balance/100).toFixed(2).replace(".",",");
  const balanceClass = balance > 0 ? "logs--value-earning" : "logs--value-expenditure";

  return (
    <LogsWrapper>
      <ListWrapper>
        {entries.map((entry) => {
          return (
            <li>
              <p className="logs--date">
                {dayjs(entry.createdAt).format("DD/MM")}
              </p>
              <p className="logs--description">
                {entry.description}
              </p>
              <p className={entry.logKind === "earning" ? "logs--value-earning" : "logs--value-expenditure"}>
                {(entry.value/100).toFixed(2).replace('.',',')}
              </p>
            </li>
          );
        })}
      </ListWrapper>
      <Balance>
        <p className="logs--balance">Saldo</p>
        <p className={balanceClass}>{balanceText}</p>
      </Balance>
    </LogsWrapper>
  );
}

const LogsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-height: 100%;
  padding: 23px 16px 10px 16px;

  .logs--date{
    color: #c6c6c6;
  }

  .logs--description{
    color: black;
    word-wrap: break-word;
    word-break: break-word;
  }

  .logs--value-earning{
    color: #03AC00;
    text-align: right;
  }

  .logs--value-expenditure{
    color: #C70000;
    text-align: right;
  }

  .logs--balance{
    font-weight: bold;
    color: black;
  }
`;


const ListWrapper = styled.ul`
  font-size: 16px;
  line-height: 19px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: calc(100% - 40px);
  max-height: calc(100% - 40px);
  overflow-y: scroll;
  padding-bottom: 20px;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  li{
    display: grid;
    grid-template-columns: 60px auto 100px;
  }
`;

const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  line-height: 20px;
  height: 20px;
`;

