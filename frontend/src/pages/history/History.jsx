import { useEffect } from "react";

function History() {
    useEffect(() => {
        const r = async () => {
            const data = await f();
        };
        r();
    }, []);

    const f = async () => {
        try {
            const response = await fetch(`http://localhost:8006/recommend_film/get-history`, {
                method: 'GET',
                credentials: 'include'
            });

            const result = await response.json();
            return result;
        } catch (error) {
            return false;
        }
    }

    return (
        <div>works</div>
    );
}

export default History