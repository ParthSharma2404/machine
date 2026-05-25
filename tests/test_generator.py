import sys
import os
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from backend.generator import format_tvl, generate_table_rows

def test_format_tvl():
    assert format_tvl(500000) == "500,000"
    assert format_tvl(1500000) == "1.5M"
    assert format_tvl(2500000000) == "2.50B"

def test_generate_table_rows():
    pools = [
        {"pool": "p1", "project": "Proj1", "symbol": "USDC", "chain": "Ethereum", "apy": 5.5, "tvlUsd": 2000000, "riskLevel": "Low"}
    ]
    rows = generate_table_rows(pools)
    assert "Proj1" in rows
    assert "USDC" in rows
    assert "2.0M" in rows
    assert "5.5%" in rows
