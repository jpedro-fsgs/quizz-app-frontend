"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Quiz } from "@/interfaces/quiz";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
} from "../../components/ui/alert-dialog";

const URL = process.env.API_URL;

const Profile = () => {
    const { user } = useAuth();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            const token = localStorage.getItem("token");
            fetch(`${URL}/api/quizzes/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setQuizzes(data);
                })
                .catch((error) => {
                    console.error(
                        "There was an error fetching the quizzes!",
                        error
                    );
                });
        }
    }, [user]);

    const handleEdit = (quizId: string) => {
        // Implement edit functionality
        console.log(`TODO: Edit quiz with id: ${quizId}`);
    };

    const handleDelete = async () => {
        if (!quizToDelete) return;

        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${URL}/api/quizzes/${quizToDelete}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setQuizzes(quizzes.filter((quiz) => quiz.id !== quizToDelete));
                setQuizToDelete(null);
            } else {
                console.error("Failed to delete quiz");
            }
        } catch (error) {
            console.error("There was an error deleting the quiz!", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Quizzes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz: Quiz) => (
                    <Card key={quiz.id}>
                        <CardHeader>
                            <CardTitle>{quiz.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{quiz.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button onClick={() => handleEdit(quiz.id)}>
                                Edit
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        onClick={() => setQuizToDelete(quiz.id)}
                                    >
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Confirm Deletion
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this
                                            quiz? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Profile;
