import { Router, Request, Response } from 'express';

import { SpotifyCategoryType } from '../../types/spotifyTypes';

const router: Router = Router();

// Get https://api.spotify.com/v1/browse/categories
router.get('/', async (req: Request, res: Response) => {
    try {
        // Get categories from Spotify API
        const categories = await fetch('https://api.spotify.com/v1/browse/categories', {
            headers: {
                Authorization: `Bearer ${req.cookies.access_token}`,
            },
        });
        const categoriesJson = await categories.json();

        if (categoriesJson.error) {
            console.error(`Error getting categories: ${categoriesJson.error}`);
            res.status(500).json({ error: 'Error getting categories' });
            return;
        }

        const spotifyCategories: SpotifyCategoryType[] = [];
        for (const category of categoriesJson.categories.items) {
            spotifyCategories.push({
                id: category.id,
                name: category.name,
                href: category.href,
                icon: category.icons[0].url,
            });
        }

        res.status(200).json(spotifyCategories);
    } catch (err) {
        console.error(`Error getting categories: ${err}`);
        res.status(500).json({ error: 'Error getting categories' });
    }   
})

export default router;