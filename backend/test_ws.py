"""Quick test to check if the WebSocket endpoint is reachable."""
import asyncio
import websockets

async def test():
    url = "ws://localhost:8000/api/prediction/stream/test123?patient_id=03&filename=A03T.mat"
    print(f"Connecting to: {url}")
    try:
        async with websockets.connect(url) as ws:
            print("Connected! Waiting for message...")
            msg = await asyncio.wait_for(ws.recv(), timeout=10)
            print(f"Got: {msg}")
    except Exception as e:
        print(f"Error: {type(e).__name__}: {e}")

asyncio.run(test())
