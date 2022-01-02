import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { UserRole } from '../models/entities/user.entity';

// Valida las condiciones puestas en los middleares anteriores
export const validateUserRole = (req: Request, res: Response, next: NextFunction) => {
    
    if(!req.body.userRole)
        return next();
    
    if (!Object.values(UserRole).includes(req.body.userRole)) {
        
        const resError: ValidationError = {
            value: req.body.userRole,
            msg: 'UserRole is invalid',
            param: 'UserRole',
            location: 'body'
        }
        
        return res.status(400).json({
            status: false,
            errors: [resError]
        });
    }
        
    next();
};