import { useState, useEffect } from "react";
import Layout from "../layout";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Adoptions() {
	const [adoptions, setAdoptions] = useState([]);
	const [loadingAdoptions, setLoadingAdoptions] = useState({});
	const [error, setError] = useState("");
	const { theme } = useTheme();

	// Fetch adoptions
	useEffect(() => {
		const fetchAdoptions = async () => {
			try {
				const response = await fetch("/api/adoption", {
					method: "GET",
				});
				if (!response.ok) {
					throw new Error("Failed to fetch adoptions");
				}
				const data = await response.json();
				setAdoptions(data);
			} catch (error) {
				console.error(error);
				setError("Unable to fetch adoptions. Please try again later.");
			}
		};

		fetchAdoptions();
	}, []);

	// Update adoption status
	const updateStatus = async (adoptionId, newStatus) => {
		setLoadingAdoptions((prev) => ({ ...prev, [adoptionId]: true }));
		try {
			const response = await fetch("/api/adoption", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ adoptionId, status: newStatus }),
			});
			if (!response.ok) {
				throw new Error("Failed to update adoption status");
			}
			const updatedAdoption = await response.json();
			setAdoptions((prev) =>
				prev.map((adoption) =>
					adoption.id === updatedAdoption.id ? updatedAdoption : adoption
				)
			);
		} catch (error) {
			console.error(error);
			setError(error.message);
		} finally {
			setLoadingAdoptions((prev) => ({ ...prev, [adoptionId]: false }));
		}
	};

	// Delete adoption
	const deleteAdoption = async (adoptionId) => {
		setLoadingAdoptions((prev) => ({ ...prev, [adoptionId]: true }));
		try {
			const response = await fetch("/api/adoption", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ adoptionId }),
			});
			if (!response.ok) {
				throw new Error("Failed to delete adoption");
			}
			setAdoptions((prev) =>
				prev.filter((adoption) => adoption.id !== adoptionId)
			);
		} catch (error) {
			console.error(error);
			setError(error.message);
		} finally {
			setLoadingAdoptions((prev) => ({ ...prev, [adoptionId]: false }));
		}
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Adoptions</h1>

			{error && <p className="text-red-500 mb-4">{error}</p>}

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="border px-4 py-2">Image</TableHead>
						<TableHead className="border px-4 py-2">Dog Name</TableHead>
						<TableHead className="border px-4 py-2">Message</TableHead>
						<TableHead className="border px-4 py-2">Breed</TableHead>
						<TableHead className="border px-4 py-2">Applicant</TableHead>
						<TableHead className="border px-4 py-2">Status</TableHead>
						<TableHead className="border px-4 py-2">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="rounded-md">
					{adoptions.length === 0 ? (
						<TableRow>
							<TableCell colSpan={7} className="text-center text-gray-500 py-4">
								No adoptions found.
							</TableCell>
						</TableRow>
					) : (
						adoptions.map((adoption) => (
							<TableRow key={adoption.id}>
								<TableCell className="border px-4 py-2">
									<Image
										src={
											adoption.dog.imageUrl[0] || "/placeholder-image-dog.png"
										}
										alt={adoption.dog.name}
										width={100}
										height={100}
										className={`rounded ${
											adoption.dog.imageUrl.length === 0 &&
											(theme === "dark" || theme === "system") &&
											"invert"
										} ${
											adoption.dog.imageUrl.length === 0
												? "object-contain"
												: "object-cover"
										}`}
									/>
								</TableCell>
								<TableCell className="border px-4 py-2">
									{adoption.dog.name}
								</TableCell>
								<TableCell className="border px-4 py-2">
									<HoverCard>
										<HoverCardTrigger>
											<div className="w-12 truncate">
												{adoption.applicationForm}
											</div>
										</HoverCardTrigger>
										<HoverCardContent>
											{adoption.applicationForm}
										</HoverCardContent>
									</HoverCard>
								</TableCell>
								<TableCell className="border px-4 py-2">
									{adoption.dog.breed.name}
								</TableCell>
								<TableCell className="border px-4 py-2">
									{adoption.user.name}
								</TableCell>
								<TableCell className="border px-4 py-2">
									<Select
										value={adoption.status}
										onValueChange={(newStatus) =>
											updateStatus(adoption.id, newStatus)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="PENDING">Pending</SelectItem>
											<SelectItem value="APPROVED">Approved</SelectItem>
											<SelectItem value="REJECTED">Rejected</SelectItem>
										</SelectContent>
									</Select>
								</TableCell>
								<TableCell className="border px-4 py-2">
									<Button
										variant="destructive"
										onClick={() => deleteAdoption(adoption.id)}
										disabled={loadingAdoptions[adoption.id]}
									>
										{loadingAdoptions[adoption.id] ? "Deleting..." : "Delete"}
									</Button>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}

Adoptions.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
