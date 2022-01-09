import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import _ from 'underscore';

import Headquarter from '../models/entities/headquarter.entity';

import ICrudController from '../interfaces/crudController.interface';
import ICrudResponse from '../interfaces/crudResponse.interface';

export default class HeadquarterController implements ICrudController {

    public async getAll(req: Request, res: Response): Promise<void> {
        const headquarterRepository: Repository<Headquarter> = getRepository(Headquarter);

        const headquarters: Headquarter[] = await headquarterRepository.find({
            where: {
                state: true
            }
        });

        const response: ICrudResponse = {
            error: false,
            message: "List of headquarters",
            data: headquarters
        }

        res.json(response);
    };

    public async getOne(req: Request, res: Response): Promise<void> {

        const headquarterRepository: Repository<Headquarter> = getRepository(Headquarter);

        const { id } = req.params;
        const headquarter: (Headquarter | undefined) = await headquarterRepository.findOne(id);

        if (headquarter) {

            const response: ICrudResponse = {
                error: false,
                message: `Headquarter #${id} data`,
                data: headquarter
            }

            res.json(response);
        } else {

            const response: ICrudResponse = {
                error: true,
                message: `There is no headquarter with the ID: ${id}`,
                data: null
            }

            res.status(404).json(response);
        }
    }

    public async create(req: Request, res: Response): Promise<void> {

        try {
            const headquarterRepository: Repository<Headquarter> = getRepository(Headquarter);
            
            const { body } = req;

            const headquarter: Headquarter = headquarterRepository.create({ ...body } as Object);
            const result: Headquarter = await headquarterRepository.save(headquarter);

            const response: ICrudResponse = {
                error: false,
                message: `Headquarter #${result.headquarterId} created`,
                data: null
            }

            res.json(response);

        } catch (error) {
            console.log(error);

            const response: ICrudResponse = {
                error: true,
                message: 'Service not available',
                data: null
            }

            res.status(500).json(response);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { body } = req;

        try {
            const headquarterRepository: Repository<Headquarter> = getRepository(Headquarter);

            const headquarter: (Headquarter | undefined) = await headquarterRepository.findOne(id);
            if (!headquarter) {
                const response: ICrudResponse = {
                    error: true,
                    message: 'There is no headquarter with the ID ' + id,
                    data: null
                }

                res.status(404).json(response);
                return;
            }

            headquarterRepository.merge(headquarter, body);
            const result: Headquarter = await headquarterRepository.save(headquarter);

            const response: ICrudResponse = {
                error: false,
                message: `Headquarter #${id} updated`,
                data: result
            }

            res.json(response);

        } catch (error) {

            console.log(error);

            const response: ICrudResponse = {
                error: true,
                message: 'Service not available',
                data: null
            }

            res.status(500).json(response);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const headquarterRepository: Repository<Headquarter> = getRepository(Headquarter);

        const headquarter: (Headquarter | undefined) = await headquarterRepository.findOne(id);

        if (!headquarter) {

            const response: ICrudResponse = {
                error: true,
                message: 'There is no headquarter with the ID ' + id,
                data: null
            }

            res.status(404).json(response);

            return;
        }

        headquarterRepository.merge(headquarter, { state: false });
        const result: Headquarter = await headquarterRepository.save(headquarter);

        const response: ICrudResponse = {
            error: true,
            message: `Headquarter #${result.headquarterId} disabled`,
            data: null
        }

        res.json(response);
    }
}
