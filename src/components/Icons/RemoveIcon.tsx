import DeleteIcon from '@mui/icons-material/Delete';
import classnames from "classnames";
import style from "./style.module.scss";

type FileIconAttributes = {
  className?: string
}

const RemoveIcon = ({ className }: FileIconAttributes) => (
  <div className={classnames(style.removeIconContainer, className)}>
    <DeleteIcon/>
  </div>
);

export default RemoveIcon;