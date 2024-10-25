import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Paper, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from 'yup';
import { useFormik } from "formik";
import Movie from "../types/Movie";

function AddMovie() {
    const movieSchema = Yup.object({
        title: Yup.string()
            .min(2, "Title is too short")
            .max(100, "Title is too long")
            .required("Please provide a title"),
        description: Yup.string()
            .min(10, "Description is too short")
            .max(1000, "Description is too long")
            .required("Please provide a description"),
        genre: Yup.string().required("Please specify the genre"),
        rating: Yup.string()
            .matches(/^\d+(\.\d{1,2})?$/, "Rating must be a valid number with up to two decimals")
            .required("Please provide a rating"),
        releaseDate: Yup.string().required("Please provide the release date"),
        posterUrl: Yup.string()
            .url("Please provide a valid URL")
            .required("Please provide a poster URL"),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newMovie: Movie): Promise<Movie> => {
            const request = await fetch(import.meta.env.VITE_API_URL + "/movie/addmovie", {
                method: "POST",
                body: JSON.stringify(newMovie),
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
        },
        onSuccess: () => {
            alert("Movie has been added successfully");
            queryClient.invalidateQueries(['movies']);
        },
        onError: (error: Error) => {
            alert(`Error: ${error.message}`);
        },
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            genre: '',
            releaseDate: '',
            rating: '',
            posterUrl: '',
        },
        validationSchema: movieSchema,
        onSubmit: (values) => {
            mutation.mutate(values);
        },
    });

    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #000000, #1a1a1a)', // Deep black gradient background
                padding: 3,
            }}
        >
            <Paper 
                elevation={6} 
                sx={{
                    padding: 4,
                    borderRadius: 3,
                    maxWidth: 500,
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
                    color: '#ffb800',
                    border: '1px solid #ffb800', // Gold border for a luxurious touch
                }}
            >
                <Typography 
                    variant="h5" 
                    sx={{
                        marginBottom: 3, 
                        textAlign: 'center', 
                        color: '#ffb800',
                        textShadow: '2px 2px 8px rgba(255, 184, 0, 0.8)',
                        fontFamily: 'Orbitron, sans-serif',
                    }}
                >
                    Add a New Movie
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    {['title', 'description', 'genre', 'releaseDate', 'rating', 'posterUrl'].map((field) => (
                        <FormControl fullWidth sx={{ my: 2 }} key={field}>
                            <InputLabel htmlFor={field} sx={{ color: '#ffb800' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</InputLabel>
                            <Input 
                                id={field}
                                type={field === 'releaseDate' ? 'date' : 'text'}
                                multiline={field === 'description'}
                                rows={field === 'description' ? 4 : undefined}
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(formik.touched[field] && formik.errors[field])}
                                sx={{
                                    color: '#ffb800',
                                    '&:before': { borderBottom: '1px solid #ffb800' }, // Gold underline before focus
                                    '&:after': { borderBottom: '2px solid #ffb800' }, // Gold underline after focus
                                }}
                            />
                            {formik.touched[field] && formik.errors[field] && (
                                <FormHelperText error>{formik.errors[field]}</FormHelperText>
                            )}
                        </FormControl>
                    ))}

                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        sx={{
                            mt: 3,
                            backgroundColor: '#ffb800',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#ffd54f',
                            },
                            boxShadow: '0 4px 15px rgba(255, 184, 0, 0.7)',
                            fontFamily: 'Roboto, sans-serif',
                        }}
                        disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                    >
                        Submit New Movie
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default AddMovie;
