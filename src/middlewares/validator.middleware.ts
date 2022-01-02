import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// Valida las condiciones puestas en los middleares anteriores
export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            ...errors
        });
    }

    next();
};