import { Response, Request } from "express";
import https from "https";
import { getPaginatedDogs } from "../services/dog.service";

export const getDog = (req: Request, res: Response) => {
	const fileUrl = `https://random.dog/${req.params.fileName}`;

	https
		.get(fileUrl, (remoteResponse) => {
			if (remoteResponse.statusCode !== 200) {
				return res.status(404).json({ error: "File not found" });
			}
			res.set("Content-Type", remoteResponse.headers["content-type"]);
			remoteResponse.pipe(res);
		})
		.on("error", (_err) => {
			res.status(500).json({ error: "Error uploading media file" });
		});
};

export const getDogs = async (req: Request, res: Response) => {
	try {
		let page = parseInt(req.query.page as string) || 1;
		let count = parseInt(req.query.count as string) || 25;

		if (isNaN(page) || page < 1) page = 1;
		if (isNaN(count) || count < 1 || count > 150) count = 25;

		const dogs = await getPaginatedDogs(page, count);

		res.status(200).json(dogs);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Unknown error" });
		}
	}
};
