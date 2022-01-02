import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import _ from 'underscore';

import Priority from '../models/entities/priority.entity';

import ICrudController from '../interfaces/crudController.interface';
import ICrudResponse from '../interfaces/crudResponse.interface';

export default class PriorityController implements ICrudController {

    public async getAll(req: Request, res: Response): Promise<void> {
        const priorityRepository: Repository<Priority> = getRepository(Priority);

        const priorities: Priority[] = await priorityRepository.find({
            where: {
                state: true
            }
        });

        const response: ICrudResponse = {
            error: false,
            message: "List of priorities",
            data: priorities
        }

        res.json(response);
    };

    public async getOne(req: Request, res: Response): Promise<void> {

        const priorityRepository: Repository<Priority> = getRepository(Priority);

        const { id } = req.params;
        const priority: (Priority | undefined) = await priorityRepository.findOne(id);

        if (priority) {

            const response: ICrudResponse = {
                error: false,
                message: `Priority #${id} data`,
                data: priority
            }

            res.json(response);
        } else {

            const response: ICrudResponse = {
                error: true,
                message: `There is no priority with the ID: ${id}`,
                data: null
            }

            res.status(404).json(response);
        }
    }

    public async create(req: Request, res: Response): Promise<void> {

        try {
            const priorityRepository: Repository<Priority> = getRepository(Priority);

            const { body } = req;

            const priority: Priority = priorityRepository.create({ ...body } as Object);
            const result: Priority = await priorityRepository.save(priority);

            const response: ICrudResponse = {
                error: false,
                message: `Priority #${result.priorityId} created`,
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
            const priorityRepository: Repository<Priority> = getRepository(Priority);

            const priority: (Priority | undefined) = await priorityRepository.findOne(id);
            if (!priority) {
                const response: ICrudResponse = {
                    error: true,
                    message: 'There is no priority with the ID ' + id,
                    data: null
                }

                res.status(404).json(response);
                return;
            }

            priorityRepository.merge(priority, body);
            const result: Priority = await priorityRepository.save(priority);

            const response: ICrudResponse = {
                error: false,
                message: `Priority #${id} updated`,
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

        const priorityRepository: Repository<Priority> = getRepository(Priority);

        const priority: (Priority | undefined) = await priorityRepository.findOne(id);

        if (!priority) {

            const response: ICrudResponse = {
                error: true,
                message: 'There is no priority with the ID ' + id,
                data: null
            }

            res.status(404).json(response);

            return;
        }

        priorityRepository.merge(priority, { state: false });
        const result: Priority = await priorityRepository.save(priority);

        const response: ICrudResponse = {
            error: true,
            message: `Priority #${result.priorityId} disabled`,
            data: null
        }

        res.json(response);
    }
}
