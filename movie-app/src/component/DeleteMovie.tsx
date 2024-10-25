import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";

function DeleteMovie({ id, closeModal }: { id: number; closeModal: () => void }) {
    const queryClient = useQueryClient();

    const deleteMovie = async () => {
        const request = await fetch(import.meta.env.VITE_API_URL + "/movie/delete/" + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("Authorization"),
            },
        });

        if (!request.ok) {
            const errorMessage = await request.text();
            throw new Error(errorMessage);
        }

        return request.json();
    };

    const mutation = useMutation({
        mutationFn: deleteMovie,
        onSuccess: () => {
            alert("Movie has been successfully deleted.");
            queryClient.invalidateQueries(['movies']);
            closeModal();
        },
        onError: (error: Error) => {
            alert(`Error: ${error.message}`);
        },
    });

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            mutation.mutate();
        }
    };

    return (
        <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={mutation.isLoading}
            sx={{
                backgroundColor: 'black', // Red color
                '&:hover': {
                    backgroundColor: '#b71c1c', // Darker red on hover
                },
                textTransform: 'none', // Keeps button text casing as-is
            }}
        >
            {mutation.isLoading ? "Deleting..." : "Delete"}
        </Button>
    );
}

export default DeleteMovie;

