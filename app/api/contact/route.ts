import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.body;
    
    if (!body) {
        return new NextResponse("Missing request body", {
            status: 400,
        });
    }

    // Aqui você pode fazer qualquer lógica necessária, como validação dos dados ou armazenamento em um banco de dados

    // Simulação de sucesso
    return new NextResponse(JSON.stringify({
        data: body,
        message: 'Mensagem recebida com sucesso!' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}