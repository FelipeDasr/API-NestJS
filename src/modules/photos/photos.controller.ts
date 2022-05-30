import { Controller } from "@nestjs/common";

import { PhotosService } from "./photos.service";

@Controller()
export class PhotosController {

    constructor(private readonly photoServices: PhotosService) { }


}