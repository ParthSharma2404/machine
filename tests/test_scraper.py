import sys
import os
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from backend.scraper import process_and_filter_pools

def test_process_and_filter_pools_valid():
    raw_data = [
        {"pool": "p1", "project": "Proj1", "symbol": "USDC", "chain": "Ethereum", "apy": 5.5, "tvlUsd": 2000000}
    ]
    processed = process_and_filter_pools(raw_data)
    assert len(processed) == 1
    assert processed[0]["baseAsset"] == "USDC"
    assert processed[0]["riskLevel"] == "Low"

def test_reject_low_tvl():
    raw_data = [
        {"pool": "p2", "project": "Proj2", "symbol": "USDC", "chain": "Ethereum", "apy": 5.5, "tvlUsd": 500000}
    ]
    processed = process_and_filter_pools(raw_data)
    assert len(processed) == 0

def test_reject_anomalous_apy():
    raw_data = [
        {"pool": "p3", "project": "Proj3", "symbol": "USDC", "chain": "Ethereum", "apy": 1500, "tvlUsd": 2000000},
        {"pool": "p4", "project": "Proj4", "symbol": "USDC", "chain": "Ethereum", "apy": -5, "tvlUsd": 2000000}
    ]
    processed = process_and_filter_pools(raw_data)
    assert len(processed) == 0

def test_reject_invalid_types():
    raw_data = [
        {"pool": "p5", "project": 123, "symbol": "USDC", "chain": "Ethereum", "apy": 5.5, "tvlUsd": 2000000},
        {"pool": "p6", "project": "Proj6", "symbol": "USDC", "chain": "Ethereum", "apy": "5.5", "tvlUsd": 2000000}
    ]
    processed = process_and_filter_pools(raw_data)
    assert len(processed) == 0
