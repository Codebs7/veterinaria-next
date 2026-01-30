
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });

export async function POST(request: Request) {
    try {
        const { title, price, quantity } = await request.json();

        const body = {
            items: [
                {
                    id: title,
                    title: title,
                    quantity: Number(quantity),
                    unit_price: Number(price),
                    currency_id: 'PEN',
                },
            ],
            back_urls: {
                success: 'http://localhost:3000/success', // UPDATE PORT TO 3000 FOR NEXT.JS
                failure: 'http://localhost:3000/failure',
                pending: 'http://localhost:3000/pending',
            },
            auto_return: 'approved',
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        return NextResponse.json({ id: result.id });
    } catch (error) {
        console.error("MP API Error:", error);
        return NextResponse.json({ error: 'Error processing payment' }, { status: 500 });
    }
}
