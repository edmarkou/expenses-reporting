import { useCallback, useState } from "react";
import style from "./style.module.scss";
import classnames from "classnames";
import { FileIcon, RemoveIcon } from "src/components/Icons";
import { ErrorMessage } from "src/components/Form";

export type FileAttributes = {
  name: string,
  size: number
}

export type FileInputAttributes = {
  value: FileAttributes[],
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  onRemove: (index: number) => void,
  id: string,
  maxFiles?: number,
  maxSize?: number
}

const FileInput = ({ 
  value, 
  onChange, 
  id, 
  onRemove, 
  maxFiles = 10, 
  maxSize = 30 
}: FileInputAttributes) => {
  const [error, setError] = useState<string>("");

  const bytesToMB = useCallback((bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Object.values(e.target.files as Object);
    if (files.length > maxFiles) {
      setError(`Maximum allowed files: ${maxFiles}`);
      return
    }

    let totalSize = 0;
    files.forEach(file => {
      totalSize += Number(bytesToMB(file.size))
    });
    if (totalSize > maxSize) {
      setError(`Maximum allowed total file size: ${maxSize}MB`);
      return
    }

    if (error) {
      setError("");
    }

    onChange(e);
  }, [bytesToMB, maxFiles, maxSize, onChange, setError, error]);

  return (
    <div className={classnames(style.inputFileContainer)}>
      <div className={classnames(style.inputFileBoxContainer)}>
        <label htmlFor={id} className={classnames(style.fileInputLabel)}>
          <span className={classnames(style.inputFileBoxHeader)}>
            Drag & Drop your files (max {maxFiles}) here or
          </span>
          <span className={classnames(style.inputFileButton)}>
            Upload file
          </span>
          <div className={classnames(style.inputFileBoxFooter)}>
            <span>
              Possible formats: pdf, png, jpg, jpeg, bmp, tiff, gif
            </span>
            <span>
              Maximum size: {maxSize}MB
            </span>
          </div>
        </label>
        <input
          className={classnames(style.inputFileBox)}
          type="file"
          id={id}
          name={id}
          onChange={onFileChange}
          accept=".png, .jpeg, .jpg, .pdf, .bmp, .gif, .tiff"
          multiple={true}
        />
      </div>
      {value.map((file: FileAttributes, i: number) => (
        <div
          key={id + i}
          className={classnames(style.imageFileContainer)}
        >
          <FileIcon className={style.fileIconColor} />
          <div className={classnames(style.imageInfoContainer)}>
            <span className={classnames(style.fileName)}>{file.name}</span>
            <span className={classnames(style.fileSize)}>{bytesToMB(file.size)} MB</span>
          </div>
          <button 
            className={classnames(style.removeImageButton)} 
            onClick={(e) => {
              e.preventDefault();
              onRemove(i);
            }}
          >
            <RemoveIcon className={style.removeIconColor}/>
          </button>
        </div>
      ))}
      <ErrorMessage error={error}/>
    </div>
  );
};

export default FileInput;
