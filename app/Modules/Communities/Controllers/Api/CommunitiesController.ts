import { HttpContext } from "@adonisjs/core/build/standalone";
import Community from "App/Modules/Communities/Community";

export default class CommunitiesController {

    public async index() {
        return await Community.query().paginate(1, 10)
    }

}