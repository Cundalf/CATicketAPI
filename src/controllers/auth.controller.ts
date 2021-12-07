import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import User, { UserRole } from '../models/entities/user.entity';

export default class AuthController {
    
    public async auth (req: Request, res: Response) {

        /*
        // you can also get it via getConnection().getRepository() or getManager().getRepository()
        const userRepository = getRepository(User); 

        let user = new User();
        user.userEmail = "acundari@laslomas.com.ar";
        user.userFirstName = "Agustin";
        user.userLastName = "Cundari";
        user.userPassword = "123456789";
        user.userRole = UserRole.ADMIN;
        user.state = true;

        await userRepository.save(user);

        //const user = await userRepository.findOne(1);
        const users = await userRepository.find();

        res.json(users);
        
        */
    }
}