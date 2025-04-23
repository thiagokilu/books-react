import React, { useState } from "react";

export default function Card({
	link,
	img,
	imgLarge,
	titulo,
	auhtor,
	ano,
	description,
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<div onClick={() => setIsModalOpen(true)}>
				<div className="bg-[#3c3c3c] w-72 max-h-96 flex flex-col p-3 items-center rounded-lg text-sm text-[#E0E0E0]">
					<img src={img} alt="" width={150} className="mb-2" />
					<h2 className="text-center text-base font-semibold leading-tight">
						{titulo}
					</h2>
					<div className="text-xs mt-1 text-center">
						<span>{auhtor}</span>
						<br />
						<span>{ano}</span>
					</div>
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full">
					<div className="bg-white p-6 rounded shadow-lg  items-start text-black w-full m-h[500px]">
						<div className="flex flex-row gap-2 items-center justify-center">
							<img src={imgLarge} alt="" width={250} className="mb-2" />
							<div className="flex flex-col gap-2 ml-8 items-start">
								<h2 className="text-2xl font-semibold leading-tight">
									{titulo}
								</h2>
								<div className=" mt-1 flex flex-row gap-2">
									<span>{auhtor}</span>
									<span>{ano}</span>
								</div>
								<div className="w-[700px] text-sm">
									<p>{description}</p>
								</div>
								<a
									href={link}
									className="bg-blue-500 text-white rounded-lg p-2 mt-2"
									target="_blank"
									rel="noopener noreferrer"
								>
									Preview
								</a>
							</div>
						</div>
						<button
							onClick={() => setIsModalOpen(false)}
							className="absolute right-2 top-35 bg-blue-500 text-white w-10 h-10 rounded-full font-semibold 
							 hover:cursor-pointer"
							type="button"
						>
							X
						</button>
					</div>
				</div>
			)}
		</>
	);
}
