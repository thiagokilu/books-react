import { useState } from "react";
import "./App.css";
import Card from "./components/card";

function App() {
	const [bookName, setBookName] = useState("");
	const [loading, setLoanding] = useState(false);
	const [bookList, setBookList] = useState([]);

	const consumirApi = async () => {
		setLoanding(true);
		try {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=40`,
			); // Substitua pela URL da sua API
			const data = await response.json(); // Converte a resposta para JSON
			console.log(data); // Exibe os dados no console (ou faça algo com eles)
			setBookList(data.items || []);
		} catch (error) {
			console.error("Erro ao consumir a API:", error); // Trata possíveis erros
		} finally {
			setLoanding(false);
		}
	};

	return (
		<div className="">
			<header className="p-2 text-center text-[#8CE2AA]">
				<h1 className="text-4xl">My Books</h1>
			</header>
			<main className="flex flex-col items-center justify-center mt-10">
				<div className="w-full flex flex-row gap-2 max-w-sm mx-auto">
					<input
						type="text"
						name="search"
						id="search"
						value={bookName}
						placeholder="Pesquisar livro..."
						className="w-full bg-[#3c3c3c] text-xl text-[#E0E0E0] placeholder-gray-400 px-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-[#8CE2AA] transition duration-300"
						onChange={(e) => setBookName(e.target.value)} // 2. Atualiza o estado com o que for digitado
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								consumirApi();
							}
						}}
					/>
					<button
						onClick={consumirApi}
						className="px-4 py-2 rounded-md bg-[#8CE2AA] text-[#3c3c3c] font-bold"
					>
						Buscar
					</button>
				</div>

				{loading && <h1>Carregando...</h1>}
				{!loading && bookList.length > 0 && (
					<section className="mt-10 flex flex-row flex-wrap gap-10 m-5 items-center justify-center">
						{bookList.map((book) => (
							<Card
								key={book.id}
								link={book.volumeInfo.previewLink}
								img={
									book.volumeInfo.imageLinks?.thumbnail ||
									book.volumeInfo.imageLinks?.smallThumbnail ||
									"https://placehold.co/200x300/3c3c3c/8ce2aa?text=Sem+Capa"
								}
								imgLarge={
									book.volumeInfo.imageLinks?.large ||
									book.volumeInfo.imageLinks?.thumbnail ||
									book.volumeInfo.imageLinks?.smallThumbnail ||
									"https://placehold.co/200x300/3c3c3c/8ce2aa?text=Sem+Capa"
								}
								titulo={book.volumeInfo.title}
								auhtor={book.volumeInfo?.authors || book.volumeInfo.publisher}
								ano={book.volumeInfo.publishedDate}
								description={book.volumeInfo.description}
							/>
						))}
					</section>
				)}
				{!loading && bookList.length === 0 && (
					<h1 className="text-center text-2xl mt-10">Pesquise por livros...</h1>
				)}
			</main>
		</div>
	);
}

export default App;
