import Header from '../../components/Header';
import classnames from 'classnames';
import style from './style.module.scss';
import Button from '../../components/Button';
import { PlusIcon } from '../../components/Icons';
import { TableContainer, Table, TableHeader, ColumnType } from '../../components/Table';
import { useNavigate } from 'react-router-dom';

const COLUMNS: ColumnType[] = [
  { name: "ID" },
  { name: "Request name" },
  {
    name: "Amount",
    alignment: "right"
  },
  { name: "Project" },
  { name: "Cost center" },
  { name: "Country" },
  { name: "Created at" },
  { name: "Status" },
]

function Home() {
  const history = useNavigate();

  return (
    <div className={classnames("container", style.horizontalCenter, style.homeBackground)}>
      <Header/>
      <div className={classnames(style.homepageContainer)}>
        <div className={classnames("row", style.verticalCenter)}>
          <h2>Request page</h2>
          <Button
            onClick={() => history("/new-request")} 
            className={style.newRequestButton}
          >
            <PlusIcon className={style.greyPlusIcon}/>
            <span>Add request</span>
          </Button>
        </div>
        <div className={classnames("row", style.verticalCenter)}>
          <TableContainer>
            <TableHeader/>
            <Table 
              columns={COLUMNS} 
              rows={[
                ["12", "name", "4323.23$", "Project 1", "Center", "LT", "2023 Jul 15", "Completed"],
                ["12", "name", "423.23$", "Project 2", "Center", "LT", "2023 Jul 15", "In progress"],
                ["12", "name", "23.23$", "Project 3", "Center", "LT", "2023 Jul 15", "Completed"]
              ]}
            />
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;
