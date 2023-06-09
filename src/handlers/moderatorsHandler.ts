import Moderator from '../models/moderatorsModel';
import { Response, Request, NextFunction as nf } from 'express';
import { passwordValidator } from '../utils/passwordValidator';
import { generateHash } from '../utils/HashPassword';

export const getAllModerators = async (
  req: Request,
  res: Response,
  next: nf,
) => {
  try {
    const moderators = await Moderator.find();
    res.status(201).json(moderators);
  } catch (err) {
    next(err);
  }
};

export const getOneModerator = async (
  req: Request,
  res: Response,
  next: nf,
) => {
  const moderatorId = req.params.id;
  try {
    const updatedModerators = await Moderator.findOne({ _id: moderatorId });
    res.status(201).json(updatedModerators);
  } catch (err) {
    next(err);
  }
};

export const InsertModerator = async (
  req: Request,
  res: Response,
  next: nf,
) => {
  try {
    const { username, email, password, role } = req.body;
    if (!passwordValidator(password))
      return res.status(400).json({ message: 'password not valid' });
    const hash = generateHash(password);
    const moderator = new Moderator({ username, email, password: hash, role });
    await moderator.save();
    res.status(201).json(moderator);
  } catch (err) {
    next(err);
  }
};

export const updateModerator = async (
  req: Request,
  res: Response,
  next: nf,
) => {
  try {
    const id = req.params.id;
    const { username, email, password, role } = req.body;
    const moderator = await Moderator.findOneAndUpdate(
      { _id: id },
      { username, email, password, role },
      { new: true },
    );
    res.status(201).json(moderator);
  } catch (err) {
    next(err);
  }
};

export const deleteModerator = async (
  req: Request,
  res: Response,
  next: nf,
) => {
  try {
    const id = req.params.id;
    const moderator = await Moderator.deleteOne({ _id: id });
    res.status(201).json(moderator);
  } catch (err) {
    next(err);
  }
};
