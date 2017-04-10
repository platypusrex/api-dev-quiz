import GameCategories from '../models/game-categories.model';

class GamesController {
	async getGameCategories(ctx) {
		ctx.body = await GameCategories.find();
	}
}

export default new GamesController();