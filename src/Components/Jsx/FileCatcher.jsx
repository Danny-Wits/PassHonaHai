import React, { useState } from "react";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
} from "@mantine/dropzone";
import { LuCopyX, LuUpload, LuX } from "react-icons/lu";
import { BsUpload } from "react-icons/bs";
import { MdPhoto } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { Badge, Group, Pill, Text } from "@mantine/core";
import { validFileTypes } from "../../Scripts/Const";

function FileCatcher({ onDrop, onReject, maxSize }) {
  return (
    <Dropzone
      onDrop={onDrop}
      onReject={onReject}
      maxSize={maxSize * 1024 * 1024}
      maxFiles={1}
      accept={validFileTypes}
    >
      <Group
        justify="center"
        gap="md"
        p={"sm"}
        mih={100}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <BsUpload size={52} color="white" stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <GiCancel size={52} color="red" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <MdPhoto size={52} color="purple" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag file here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

export default FileCatcher;
