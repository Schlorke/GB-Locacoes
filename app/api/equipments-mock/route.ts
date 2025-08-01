import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    // Mock data for equipments
    const mockEquipments = [
      {
        id: '1',
        name: 'Escavadeira Hidráulica',
        description: 'Escavadeira para trabalhos pesados',
        category: 'Escavação',
        price: 350.0,
        image: '/placeholder.jpg',
        available: true,
      },
      {
        id: '2',
        name: 'Betoneira 400L',
        description: 'Betoneira para preparo de concreto',
        category: 'Concreto',
        price: 45.0,
        image: '/placeholder.jpg',
        available: true,
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockEquipments,
      total: mockEquipments.length,
    });
  } catch (error) {
    console.error('Error in equipments-mock API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch equipments' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    return NextResponse.json({
      success: true,
      message: 'Equipment created successfully (mock)',
      data: { id: Date.now().toString(), ...body },
    });
  } catch (error) {
    console.error('Error creating equipment (mock):', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create equipment' },
      { status: 500 },
    );
  }
}
