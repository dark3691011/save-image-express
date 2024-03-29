import { httpResponse } from "../util";

export class ResizeImageReqDto {
  fileName!: string;
  width!: number;
  height!: number;
}

export class ResizeImageResDto extends httpResponse {
  data?: Buffer;
}
