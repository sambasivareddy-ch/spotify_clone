import React, { useEffect, useState } from "react";

import SpotifyCard from "../components/SpotifyCard";
import { SpotifyCategoryType } from "../models/spotify-types";
import styles from "../styles/home.module.css";

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<SpotifyCategoryType[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(
                "http://localhost:3000/api/get-categories",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!data) {
                console.error("Unable to fetch the categories");
            }

            const fetchedCategories: SpotifyCategoryType[] = [];
            for (let i: number = 0; i < data.length; i++) {
                const element: SpotifyCategoryType = data[i];
                fetchedCategories.push(element);
            }
            setCategories(fetchedCategories);
        };

        fetchCategories();
    }, []);

    return (
        <div className={styles['home-wrapper']}>
            <div className={styles['categories-wrapper']}>
                <div className={styles['categories']}>
                    {categories.map((category: SpotifyCategoryType) => {
                        return (
                            <SpotifyCard
                                key={Math.random()}
                                id={category.id}
                                name={category.name}
                                href={category.name}
                                icon={category.icon}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Categories;
