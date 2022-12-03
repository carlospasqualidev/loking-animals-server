import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

import {
	Container,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

const Animal = ({ data }) => {
	const { AnimalHistory, Breed, Gender, AnimalActionHistory } = data

	const dateFormatter = (date) =>
		new Date(date).toLocaleDateString("pt-BR", {
			timeZone: "UTC",
			hour: "2-digit",
			minute: "2-digit",
		});

	return (
		<Container maxWidth="lg" style={{ marginBottom: 20 }}>
			<div style={{ ...style }}>
				<Image
					src={AnimalHistory?.length > 0 && AnimalHistory[0].image}
					quality={100}
					width={1000}
					height={400}
					objectFit="cover"
					style={{ ...imageStyle }}
				/>
				<Typography
					variant="h4"
					component="h4"
					fontWeight="medium"
					style={{ ...textStyle }}
				>
					{Breed?.name || ""}
				</Typography>
				<Typography
					variant="small"
					component="small"
					fontSize={20}
					style={{ ...subtitleStyle }}
				>
					{Gender?.name || ""}
				</Typography>
				<Typography
					variant="h5"
					component="h5"
					fontSize={25}
					color="#6C6C6C"
					style={{ marginTop: 40, marginBottom: 10 }}
				>
					Histórico
				</Typography>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow style={{ backgroundColor: "#F2F2F2" }}>
								<TableCell align="left">Idade(Em dias)</TableCell>
								<TableCell align="left">Peso(kg)</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{AnimalHistory.map(({ age, image, weight }) => (
								<TableRow key={age}>
									<TableCell align="left">{age}</TableCell>
									<TableCell align="left">{weight}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				<Typography
					variant="h5"
					component="h5"
					fontSize={25}
					color="#6C6C6C"
					style={{ marginTop: 40, marginBottom: 10 }}
				>
					Atividades
				</Typography>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow style={{ backgroundColor: "#F2F2F2" }}>
								<TableCell align="left">Local</TableCell>
								<TableCell align="left">Ação(kg)</TableCell>
								<TableCell align="left">Data de Inicio</TableCell>
								<TableCell align="left">Data de Fim</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{AnimalActionHistory.map(
								({ Local, AnimalAction, endTime, startTime }) => (
									<TableRow key={Local.name}>
										<TableCell align="left">{Local.name}</TableCell>
										<TableCell align="left">{AnimalAction.name}</TableCell>
										<TableCell align="left">
											{(startTime && dateFormatter(startTime)) || "-"}
										</TableCell>
										<TableCell align="left">
											{(endTime && dateFormatter(endTime)) || "-"}
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Container>
	);
};

const style = {
	display: "flex",
	flexDirection: "column",
	marginTop: 20,
};

const imageStyle = {
	borderRadius: 5,
};

const textStyle = {
	marginTop: 20,
	color: "#4B4B4B",
};

const subtitleStyle = {
	color: "#8B8B8B",
};

export async function getServerSideProps({ query }) {
	const { id } = query;

	const url = `http://localhost:8080/api/backoffice/animals/details/${id}`;

	const response = await axios({ method: "get", url });

	return {
		props: {data: response?.data},
	};
}

// id: "713b8d46-11ba-4c31-8a3c-8a83706e5754",
// 			Gender: {
// 				name: "Macho",
// 			},
// 			Breed: {
// 				name: "Jersey",
// 			},
// 			AnimalHistory: [
// 				{
// 					age: 450,
// 					image:
// 						"https://s2.glbimg.com/J4t2oY-w6f0jcnBHoapgvX9UARU=/0x0:695x394/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2019/b/Q/ibQsuaQRmo9YSNqAmoTw/vaca-oculos-realidade-1.jpg",
// 					weight: 350,
// 				},
// 				{
// 					age: 340,
// 					image:
// 						"https://s2.glbimg.com/J4t2oY-w6f0jcnBHoapgvX9UARU=/0x0:695x394/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2019/b/Q/ibQsuaQRmo9YSNqAmoTw/vaca-oculos-realidade-1.jpg",
// 					weight: 300,
// 				},
// 			],
// 			AnimalActionHistory: [
// 				{
// 					id: "82c93be4-e36f-4f4b-8b04-644c5af86010",
// 					endTime: null,
// 					startTime: "2022-12-03T15:39:52.318Z",
// 					Local: {
// 						name: "Pasto",
// 					},
// 					AnimalAction: {
// 						name: "Movimento",
// 					},
// 				},
// 				{
// 					id: "fbf30c88-8c37-43e2-a5c4-62e6b237b1e9",
// 					endTime: null,
// 					startTime: "2022-12-03T15:39:52.335Z",
// 					Local: {
// 						name: "Comida",
// 					},
// 					AnimalAction: {
// 						name: "Comendo",
// 					},
// 				},
// 				{
// 					id: "9766f424-76b5-4216-9a88-d6a03394c75b",
// 					endTime: null,
// 					startTime: "2022-12-03T15:39:52.346Z",
// 					Local: {
// 						name: "Vacina",
// 					},
// 					AnimalAction: {
// 						name: "Vacinando",
// 					},
// 				},
// 			],

export default Animal;
