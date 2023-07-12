import style from "./style.module.scss";
import classnames from "classnames";

export type ColumnType = {
  name: string,
  alignment?: "left" | "right"
}

type TableProps = {
  columns: ColumnType[],
  rows: string[][]
}

const Table = ({ columns, rows }: TableProps) => (
  <table className={classnames(style.table)}>
    <thead>
      <tr>
        {columns.map((col, i) => (
          <th 
            className={classnames({
              [style.rightAlignment]: col.alignment === 'right'
            })} 
            key={col.name + i}
          >
            {col.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map(row => (
        <tr>
          {row.map((value, i) => (
            <td
              key={value + i}
              className={classnames({
                [style.rightAlignment]: columns[i].alignment === 'right'
              })} 
            >
              {value}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;