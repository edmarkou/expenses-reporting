import Header from 'src/components/Header';
import classnames from 'classnames';
import style from './style.module.scss';
import Button from 'src/components/Button';
import { PlusIcon } from 'src/components/Icons';
import { TableContainer, Table, TableHeader } from 'src/components/Table';
import { useNavigate } from 'react-router-dom';
import { REQUEST_COLUMNS } from 'src/helpers/constants';

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
              columns={REQUEST_COLUMNS} 
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
