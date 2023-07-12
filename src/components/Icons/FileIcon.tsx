import Icon from '@mui/icons-material/InsertDriveFile';
import classnames from "classnames";
import style from "./style.module.scss";

type FileIconAttributes = {
  className?: string
}

const FileIcon = ({ className }: FileIconAttributes) => (
  <div className={classnames(style.fileIconContainer, className)}>
    <Icon/>
  </div>
);

export default FileIcon;