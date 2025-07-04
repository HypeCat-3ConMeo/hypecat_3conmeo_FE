import { useDropzone } from "react-dropzone";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack, Button } from "@mui/material";
// type
import { type UploadMultiFileProps } from "./type";
//
import BlockContent from "./BlockContent";
import RejectionFiles from "./RejectionFiles";
import MultiFilePreview from "./MultiFilePreview";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F4F6F8",
  border: `1px dashed rgba(145, 158, 171, 0.32)`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ----------------------------------------------------------------------

export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  ...other
}: UploadMultiFileProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [],
    },
    useFsAccessApi: true,
    ...other,
  });

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />
      </DropZoneStyle>

      {fileRejections?.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      <MultiFilePreview
        files={files}
        showPreview={showPreview}
        onRemove={onRemove}
      />

      {files?.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Xoá hết
          </Button>
        </Stack>
      )}

      {helperText && helperText}
    </Box>
  );
}
